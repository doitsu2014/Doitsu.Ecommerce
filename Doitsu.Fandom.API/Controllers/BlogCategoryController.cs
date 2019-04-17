using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doitsu.Fandom.DBManager.ViewModels;
using Doitsu.DBManager.Fandom.Services;
using Doitsu.Fandom.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Doitsu.Fandom.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class BlogCategoryController : ControllerBase
    {
        private readonly IBlogCategoryService blogCategoryService;
        public BlogCategoryController(IBlogCategoryService blogService)
        {
            this.blogCategoryService = blogService;
        }

        [AllowAnonymous, HttpGet("read")]
        public ActionResult Get()
        {
            try
            {
                var blogCategories = this.blogCategoryService.GetAllActive();
                return Ok(BaseResponse<IQueryable<BlogCategoryViewModel>>.PrepareDataSuccess(blogCategories, "Get blog successful!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}