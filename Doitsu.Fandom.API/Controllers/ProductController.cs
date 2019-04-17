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
    public class ProductController : ControllerBase
    {
        private readonly IProductService productService;
        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }

        [AllowAnonymous, HttpGet("read-by-slug")]
        public ActionResult Get([FromQuery]string slug)
        {
            try
            {
                var product = this.productService.FindBySlug(slug);
                return Ok(BaseResponse<ProductViewModel>.PrepareDataSuccess(product, "Get product successful!"));
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
                var result = this.productService.CountProducts(collectionId);
                return Ok(BaseResponse<int>.PrepareDataSuccess(result, "Cout product success successful!"));

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);

            }
        }

        [AllowAnonymous, HttpGet("read")]
        public ActionResult Get([FromQuery]int limit, [FromQuery]int pageSize, [FromQuery]int currentPage, [FromQuery]string name, [FromQuery]int? collectionId, [FromQuery]int? id)
        {
            try
            {
                var listProduct = this.productService.GetActiveByQuery(limit, pageSize, currentPage, name, collectionId, id).ToList();
                return Ok(BaseResponse<List<ProductViewModel>>.PrepareDataSuccess(listProduct, "Get list products successful!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);

            }
        }
        [HttpPost("create")]
        public ActionResult Post([FromBody]ProductViewModel productAPIVM)
        {
            try
            {
                var productVM = this.productService.Create(productAPIVM);
                return Ok(BaseResponse<ProductViewModel>.PrepareDataSuccess(productVM, "Create a product successful!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);

            }
        }
        [HttpPut("update")]
        public async Task<ActionResult> Put([FromBody]ProductViewModel productAPIVM)
        {
            try
            {
                var productVM = await this.productService.UpdateAsync(productAPIVM.Id, productAPIVM);
                return Ok(BaseResponse<ProductViewModel>.PrepareDataSuccess(productVM, "Update the product successful!"));

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);

            }
        }
        [HttpDelete("delete")]
        public async Task<ActionResult> Delete([FromQuery]ProductViewModel model)
        {
            try
            {
                var originData = await productService.FindByIdAsync(model.Id);
                originData.Active = false;
                await this.productService.DeactiveAsync(model.Id);
                return Ok(BaseResponse<ProductViewModel>.PrepareDataSuccess(model, "Delete the product successful!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);

            }
        }
    }
}