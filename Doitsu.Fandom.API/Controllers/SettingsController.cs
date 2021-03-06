﻿using Doitsu.DBManager.Fandom;
using Doitsu.Fandom.DBManager.ViewModels;
using Doitsu.DBManager.Fandom.Services;
using Doitsu.Fandom.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Doitsu.Fandom.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private readonly IProductCollectionService productCollectionService;
        private readonly IBlogService blogService;

        public SettingsController(IProductCollectionService productCollectionService, IBlogService blogService)
        {
            this.productCollectionService = productCollectionService;
            this.blogService = blogService;
        }

        [HttpGet("read-list-slider")]
        [AllowAnonymous]
        public async Task<ActionResult> GetListSlider([FromQuery] bool? isSlider, [FromQuery]int limit = 300, [FromQuery]int currentPage = 0)
        {
            try
            {
                var taskGetListProductCollection = (
                    productCollectionService.GetActiveByQuery(limit, currentPage, isSlider: isSlider)
                    .ToListAsync());

                var taskGetListBlog = (blogService.GetActiveByQuery(limit, currentPage, isSlider: isSlider)
                    .ToListAsync());

                var taskCountListProductCollection = productCollectionService.CountWithIsSliderAsync(isSlider);

                var taskCountBlogs = blogService.CountBlogsByBlogCategoryIdAsync(null);


                var listProductCollection = (await taskGetListProductCollection)
                    .Select(pc => ConvertProductCollectionToSlider(pc));
                var listBlog = (await taskGetListBlog)
                    .Select(b => ConvertBlogToSlider(b));


                var result = new List<SliderViewModel>();
                //Add range list product collection
                result.AddRange(listProductCollection);
                //Add rang list blog
                result.AddRange(listBlog);

                if (result.Count <= 0)
                {
                    return NoContent();
                }

                //Order
                result = result.OrderByDescending(x => x.IsSlider).ToList();
                var response = BaseResponse<List<SliderViewModel>>.PrepareDataSuccess(result);
                response.TotalAvailData = result.Count;
                response.TotalFullData = (await taskCountBlogs) + (await taskCountListProductCollection);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpPut("update-is-slider")]
        public ActionResult Put(SliderViewModel data)
        {
            try
            {
                var splitOriginalId = data.OriginalId.Split('-');
                var type = int.Parse(splitOriginalId[0]);
                var id = int.Parse(splitOriginalId[1]);

                if (type == (int)SliderTypeEnum.Blog)
                {
                    var originalModel = blogService.FirstOrDefaultActive(b => b.Id == id);
                    originalModel.IsSlider = data.IsSlider;
                    blogService.Update(originalModel);
                }
                else
                {
                    var originalModel = productCollectionService.FirstOrDefaultActive(b => b.Id == id);
                    originalModel.IsSlider = data.IsSlider;
                    productCollectionService.Update(originalModel);
                }
                return Ok(BaseResponse<string>.PrepareDataSuccess("You already updated slider"));

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);

            }
        }

        /// <summary>
        /// Convert Product Collection to Slider
        /// Default type of product collection is in Slider Type Enum
        /// </summary>
        /// <param name="pc"></param>
        /// <returns></returns>
        private SliderViewModel ConvertProductCollectionToSlider(ProductCollectionViewModel pc)
        {
            var typeOfSlider = (int)SliderTypeEnum.ProductCollection;
            var slider = new SliderViewModel()
            {
                OriginalId = $"{typeOfSlider}-{pc.ID}",
                Type = typeOfSlider,
                IsSlider = pc.IsSlider,
                ThumbnailURL = pc.ThumbnailURL,
                Title = pc.Name,
                Slug = pc.Slug
            };
            return slider;
        }

        /// <summary>
        /// Convert Blog to Slider
        /// Default type of Blog is in Slider Type Enum
        /// </summary>
        /// <param name="b"></param>
        /// <returns></returns>
        private SliderViewModel ConvertBlogToSlider(BlogViewModel b)
        {
            var typeOfSlider = (int)SliderTypeEnum.Blog;
            var slider = new SliderViewModel()
            {
                OriginalId = $"{typeOfSlider}-{b.Id}",
                Type = typeOfSlider,
                BlogCategoryId = b.BlogCategoryID.Value,
                IsSlider = b.IsSlider,

                ThumbnailURL = b.ThumbnailURL,
                Title = b.Title,
                Slug = b.Slug
            };
            return slider;
        }
    }
}