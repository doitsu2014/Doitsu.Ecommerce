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
        private IProductService productService;
        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }

        [AllowAnonymous, HttpGet("read-by-slug")]
        public ActionResult Get([FromQuery]string slug)
        {
            var product = this.productService.FindBySlug(slug);
            return Ok(BaseResponse<ProductViewModel>.PrepareDataSuccess(product, "Get product successful!"));
        }
        [AllowAnonymous, HttpGet("count")]
        public ActionResult Get([FromQuery]int? collectionId)
        {
            var result = this.productService.CountProducts(collectionId);
            return Ok(BaseResponse<int>.PrepareDataSuccess(result, "Cout product success successful!"));
        }
        [AllowAnonymous, HttpGet("read")]
        public ActionResult Get([FromQuery]int limit, [FromQuery]int pageSize, [FromQuery]int currentPage, [FromQuery]string name, [FromQuery]int? collectionId, [FromQuery]int? id)
        {
            var listProduct = this.productService.GetActiveByQuery(limit, pageSize, currentPage, name, collectionId, id).ToList();
            return Ok(BaseResponse<List<ProductViewModel>>.PrepareDataSuccess(listProduct, "Get list products successful!"));
        }
        [HttpPost("create")]
        public ActionResult Post([FromBody]ProductViewModel productAPIVM)
        {
            var productVM = this.productService.Create(productAPIVM);
            return Ok(BaseResponse<ProductViewModel>.PrepareDataSuccess(productVM, "Create a product successful!"));
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
                Console.WriteLine(ex);
                throw;
            }
        }
        [HttpDelete("delete")]
        public async Task<ActionResult> Delete([FromQuery]ProductViewModel model)
        {
            var originData = await productService.FindByIdAsync(model.Id);
            originData.Active = false;
            await this.productService.DeactiveAsync(model.Id);
            return Ok(BaseResponse<ProductViewModel>.PrepareDataSuccess(model, "Delete the product successful!"));
        }
    }
}