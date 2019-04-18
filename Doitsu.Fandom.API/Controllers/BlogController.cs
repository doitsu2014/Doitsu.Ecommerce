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
using Microsoft.EntityFrameworkCore;

namespace Doitsu.Fandom.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService blogService;
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
        public async Task<ActionResult> Get([FromQuery]int currentPage, [FromQuery]string name, [FromQuery]int? blogCategoryId, [FromQuery]int? id, [FromQuery]bool isShortTerm = false, [FromQuery]int limit = 100)
        {
            try
            {
                if (!isShortTerm)
                {
                    var listBlog = await this.blogService
                        .GetActiveByQuery(limit, currentPage, name, blogCategoryId, id)
                        .ToListAsync();
                    var result = BaseResponse<List<BlogViewModel>>.PrepareDataSuccess(listBlog, "Get list blogs successful!");
                    var totalFullData = this.blogService.CountBlogs(blogCategoryId);
                    var totalAvailData = listBlog.Count;
                    result.TotalFullData = totalFullData;
                    result.TotalAvailData = totalAvailData;
                    return Ok(result);
                }
                else
                {
                    var listBlog = await this.blogService
                        .GetActiveShortTermByQuery(limit, currentPage, name, blogCategoryId, id)
                        .ToListAsync();
                    var result = BaseResponse<List<BlogShortTermViewModel>>.PrepareDataSuccess(listBlog, "Get list short term blog successful!");
                    var totalFullData = this.blogService.CountBlogs(blogCategoryId);
                    var totalAvailData = listBlog.Count;
                    result.TotalFullData = totalFullData;
                    result.TotalAvailData = totalAvailData;
                    return Ok(result);
                }
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