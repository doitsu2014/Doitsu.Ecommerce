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
    public class BlogController : ControllerBase
    {
        private IBlogService blogService;
        public BlogController(IBlogService blogService)
        {
            this.blogService = blogService;
        }

        [AllowAnonymous, HttpGet("read-by-slug")]
        public ActionResult Get([FromQuery]string slug)
        {
            try
            {
                var blog = this.blogService.FindBySlug(slug);
                return Ok(BaseResponse<BlogViewModel>.PrepareDataSuccess(blog, "Get blog successful!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [AllowAnonymous, HttpGet("count")]
        public ActionResult Get([FromQuery]int? collectionId)
        {
            try
            {
                var result = this.blogService.CountBlogs(collectionId);
                return Ok(BaseResponse<int>.PrepareDataSuccess(result, "Cout blog success successful!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [AllowAnonymous, HttpGet("read")]
        public ActionResult Get([FromQuery]int limit, [FromQuery]int pageSize, [FromQuery]int currentPage, [FromQuery]string name, [FromQuery]int? blogCategoryId, [FromQuery]int? id)
        {
            try
            {
                var listBlog = this.blogService.GetActiveByQuery(limit, pageSize, currentPage, name, blogCategoryId, id).ToList();
                return Ok(BaseResponse<List<BlogViewModel>>.PrepareDataSuccess(listBlog, "Get list blogs successful!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpPost("create")]
        public ActionResult Post([FromBody]BlogViewModel blogAPIVM)
        {
            try
            {
                var blogVM = this.blogService.Create(blogAPIVM);
                return Ok(BaseResponse<BlogViewModel>.PrepareDataSuccess(blogVM, "Create a blog successful!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpPut("update")]
        public async Task<ActionResult> Put([FromBody]BlogViewModel blogAPIVM)
        {
            try
            {
                var blogVM = await this.blogService.UpdateAsync(blogAPIVM.Id, blogAPIVM);
                return Ok(BaseResponse<BlogViewModel>.PrepareDataSuccess(blogVM, "Update the blog successful!"));

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete([FromQuery]BlogViewModel model)
        {
            try
            {
                var originData = await blogService.FirstOrDefaultAsync(x => x.Id == model.Id);
                originData.Active = false;
                await this.blogService.UpdateAsync(originData);
                return Ok(BaseResponse<BlogViewModel>.PrepareDataSuccess(originData, "Delete the blog successful!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}