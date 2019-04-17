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
    [Route("api/product-collection")]
    [ApiController]
    public class ProductCollectionController : ControllerBase
    {
        private readonly IProductCollectionService productCollectionService;
        private readonly IProductService productService;
        public ProductCollectionController(IProductCollectionService productCollectionService, IProductService productService)
        {
            this.productCollectionService = productCollectionService;
            this.productService = productService;
        }
        [AllowAnonymous, HttpGet("read-by-slug")]
        public ActionResult Get([FromQuery]string slug)
        {
            var productCollection = this.productCollectionService.GetBySlug(slug);
            var listProducts = this.productService.GetActive(p=>p.CollectionId == productCollection.ID)
                .OrderByDescending(p => p.CreatedTime)
                .OrderBy(p=>p.Code)
                .ToList();
            productCollection.ListProducts = listProducts;
            return Ok(BaseResponse<ProductCollectionViewModel>.PrepareDataSuccess(productCollection, "Get list artists successful!"));
        }
        [AllowAnonymous, HttpGet("read-by-artist-code")]
        public ActionResult Get([FromQuery]int limit, [FromQuery]int pageSize, [FromQuery]int currentPage, [FromQuery]string artistCode)
        {
            var listArtist = this.productCollectionService.GetActiveByQueryArtistCode(limit, currentPage, artistCode).ToList();
            return Ok(BaseResponse<List<ProductCollectionViewModel>>.PrepareDataSuccess(listArtist, "Get list artists by artist code successful!"));
        }
        [AllowAnonymous, HttpGet("read")]
        public ActionResult Get([FromQuery]int limit, [FromQuery]int pageSize, [FromQuery]int currentPage, [FromQuery]string code, [FromQuery]int? id)
        {
            var listArtist = this.productCollectionService.GetActiveByQuery(limit, currentPage, code, id).ToList();
            return Ok(BaseResponse<List<ProductCollectionViewModel>>.PrepareDataSuccess(listArtist, "Get list artists successful!"));
        }
        [HttpPost("create")]
        public ActionResult Post([FromBody]ProductCollectionViewModel productRequestVM)
        {
            var productCollectionVM = this.productCollectionService.Create(productRequestVM);
            return Ok(BaseResponse<ProductCollectionViewModel>.PrepareDataSuccess(productCollectionVM, "Create a artist successful!"));
        }
        [HttpPut("update")]
        public async Task<ActionResult> Put([FromBody]ProductCollectionViewModel productRequestVM)
        {
            var productCollectionVM = await this.productCollectionService.UpdateAsync(productRequestVM.ID, productRequestVM);
            return Ok(BaseResponse<ProductCollectionViewModel>.PrepareDataSuccess(productCollectionVM, "Update the artist successful!"));
        }
        [HttpDelete("delete")]
        public async Task<ActionResult> Delete([FromQuery]ProductCollectionViewModel model)
        {
            var originData = await productCollectionService.FindByIdAsync(model.ID);
            originData.Active = false;
            await this.productCollectionService.DeactiveAsync(model.ID);
            return Ok(BaseResponse<ProductCollectionViewModel>.PrepareDataSuccess(model, "Delete the artist successful!"));
        }
    }
}