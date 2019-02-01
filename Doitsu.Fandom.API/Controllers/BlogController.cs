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

        [AllowAnonymous, Route("read-by-slug")]
        public ActionResult Get([FromQuery]string slug)
        {
            var blog = this.blogService.FindBySlug(slug);
            return Ok(BaseResponse<BlogViewModel>.PrepareDataSuccess(blog, "Get blog successful!"));
        }
        [AllowAnonymous, Route("count")]
        public ActionResult Get([FromQuery]int? collectionId)
        {
            var result = this.blogService.CountBlogs(collectionId);
            return Ok(BaseResponse<int>.PrepareDataSuccess(result, "Cout blog success successful!"));
        }
        [AllowAnonymous, Route("read")]
        public ActionResult Get([FromQuery]int limit, [FromQuery]int pageSize, [FromQuery]int currentPage, [FromQuery]string name, [FromQuery]int? blogCategoryId, [FromQuery]int? id)
        {
            var listBlog = this.blogService.GetActiveByQuery(limit, pageSize, currentPage, name, blogCategoryId, id).ToList();
            return Ok(BaseResponse<List<BlogViewModel>>.PrepareDataSuccess(listBlog, "Get list blogs successful!"));
        }
        [Route("create")]
        public ActionResult Post([FromBody]BlogViewModel blogAPIVM)
        {
            try
            {
                var blogVM = this.blogService.Create(blogAPIVM);
                return Ok(BaseResponse<BlogViewModel>.PrepareDataSuccess(blogVM, "Create a blog successful!"));
            }
            catch (Exception ex)
            {
                return BadRequest(BaseResponse<Exception>.PrepareDataFail(ex));
            }
        }
        [Route("update")]
        public async Task<ActionResult> Put([FromBody]BlogViewModel blogAPIVM)
        {
            try
            {
                var blogVM = await this.blogService.UpdateAsync(blogAPIVM.Id, blogAPIVM);
                return Ok(BaseResponse<BlogViewModel>.PrepareDataSuccess(blogVM, "Update the blog successful!"));

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }
        }
        [Route("delete")]
        public async Task<ActionResult> Delete([FromQuery]BlogViewModel model)
        {
            var originData = await blogService.FindByIdAsync(model.Id);
            originData.Active = false;
            await this.blogService.DeactiveAsync(model.Id);
            return Ok(BaseResponse<BlogViewModel>.PrepareDataSuccess(model, "Delete the blog successful!"));
        }
    }
}