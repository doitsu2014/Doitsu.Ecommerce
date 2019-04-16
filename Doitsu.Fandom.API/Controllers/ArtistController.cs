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
using System.Security.Claims;
using Microsoft.Extensions.Logging;

namespace Doitsu.Fandom.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private IArtistService artistService;

        public ArtistController(IArtistService artistService)
        {
            this.artistService = artistService;
        }

        [AllowAnonymous, HttpGet("read")]
        public ActionResult Get([FromQuery]string name, [FromQuery]string code, [FromQuery]int? id, [FromQuery]int limit = 0, [FromQuery]int pageSize = 0, [FromQuery]int currentPage = 0)
        {
            try
            {
                var listArtist = this.artistService.GetActiveByQuery(limit, pageSize, currentPage, name, code, id).ToList();
                if (listArtist.Count <= 0)
                {
                    return NoContent();
                }
                return Ok(BaseResponse<List<ArtistViewModel>>.PrepareDataSuccess(listArtist, "Get list artists successful!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
        [HttpPost("create")]
        public ActionResult Post([FromBody]ArtistViewModel artistAPIVM)
        {
            try
            {
                var artistVM = this.artistService.Create(artistAPIVM);
                return Ok(BaseResponse<ArtistViewModel>.PrepareDataSuccess(artistVM, "Create a artist successful!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
        [HttpPut("update")]
        public async Task<ActionResult> Put([FromBody]ArtistViewModel artistAPIVM)
        {
            try
            {
                var artistVM = await this.artistService.UpdateAsync(artistAPIVM.Id, artistAPIVM);
                return Ok(BaseResponse<ArtistViewModel>.PrepareDataSuccess(artistVM, "Update the artist successful!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
        [HttpDelete("delete")]
        public async Task<ActionResult> Delete([FromQuery]ArtistViewModel model)
        {
            try
            {
                var originData = await artistService.FindByIdAsync(model.Id);
                originData.Active = false;
                await this.artistService.UpdateAsync(model.Id, originData);
                return Ok(BaseResponse<ArtistViewModel>.PrepareDataSuccess(model, "Delete the artist successful!"));
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }
    }
}