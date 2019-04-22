using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doitsu.DBManager.Fandom.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
using Doitsu.Fandom.API.Models;
using Doitsu.Fandom.DbManager.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Doitsu.Fandom.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : Controller
    {
        private readonly ITagService tagService;
        private readonly IBlogTagService blogTagService;
        public TagController(ITagService tagService, IBlogTagService blogTagService)
        {
            this.tagService = tagService;
            this.blogTagService = blogTagService;
        }

        [HttpGet("read-popular")]
        public async Task<ActionResult> GetPopularAsync()
        {
            var result = await tagService.GetPopularAsync();
            if (result == null)
            {
                return NoContent();
            }

            var res = BaseResponse<List<TagViewModel>>.PrepareDataSuccess(result);
            res.TotalFullData = await tagService.CountTagAsync();
            res.TotalAvailData = result.Count;
            return Ok(res);
        }

        [HttpGet("read")]
        public async Task<ActionResult> Get([FromQuery]int blogId)
        {
            var listBlogTag = await blogTagService.GetActive(x => x.BlogId == blogId).Select(x => x.TagId).ToListAsync();
            var result = await tagService.GetActive(x => listBlogTag.Contains(x.Id)).ToListAsync();
            if (result.Count == 0)
            {
                return NoContent();
            }
            var res = BaseResponse<List<TagViewModel>>.PrepareDataSuccess(result);
            res.TotalAvailData = result.Count;
            return Ok(res);
        }
    }
}
