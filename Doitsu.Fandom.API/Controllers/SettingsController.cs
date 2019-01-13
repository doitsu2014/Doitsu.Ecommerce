using Doitsu.DBManager.Fandom;
using Doitsu.DBManager.Fandom.Models.ViewModels;
using Doitsu.DBManager.Fandom.Services;
using Doitsu.Fandom.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Doitsu.Fandom.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class SettingsController : ControllerBase
    {
        private IProductCollectionService productCollectionService;
        private IBlogService blogService;

        public SettingsController(IProductCollectionService productCollectionService, IBlogService blogService)
        {
            this.productCollectionService = productCollectionService;
            this.blogService = blogService;
        }

        [Route("read-list-slider")]
        [AllowAnonymous]
        public ActionResult GetListSlider([FromQuery]int limit, [FromQuery]int pageSize, [FromQuery]int currentPage, [FromQuery] bool? isSlider)
        {
            var listProductCollection =
                productCollectionService.GetActiveByQuery(limit, pageSize, currentPage, isSlider: isSlider)
                .ToList()
                .Select(pc => ConvertProductCollectionToSlider(pc));

            var listBlog = blogService
                .GetActiveByQuery(limit, pageSize, currentPage, isSlider: isSlider)
                .ToList()
                .Select(b => ConvertBlogToSlider(b));

            var result = new List<SliderViewModel>();

            //Add range list product collection
            result.AddRange(listProductCollection);
            //Add rang list blog
            result.AddRange(listBlog);

            //Order
            result = result.OrderByDescending(x => x.IsSlider).ToList();

            return Ok(BaseResponse<List<SliderViewModel>>.PrepareDataSuccess(result));
        }

        [Route("update-is-slider")]
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
                    var originalModel = productCollectionService.FirstOrDefaultActive(b => b.ID == id);
                    originalModel.IsSlider = data.IsSlider;
                    productCollectionService.Update(originalModel);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(BaseResponse<Exception>.PrepareDataFail(ex));
            }
            return Ok(BaseResponse<string>.PrepareDataSuccess("You already updated slider"));
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
                IsSlider = b.IsSlider,
                ThumbnailURL = b.ThumbnailURL,
                Title = b.Title,
                Slug = b.Slug
            };
            return slider;
        }
    }
}