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
        private ILogger logger;

        public ArtistController(IArtistService artistService, ILogger<ArtistController> logger)
        {
            this.logger = logger;
            this.artistService = artistService;
            logger.LogInformation("Touching: ArtistController {DateTime.UtcNow.AddHours(7).ToLongTimeString()}");
        }

        [AllowAnonymous,HttpGet("read")]
        public ActionResult Get([FromQuery]string name, [FromQuery]string code, [FromQuery]int? id, [FromQuery]int limit = 0, [FromQuery]int pageSize = 0, [FromQuery]int currentPage = 0)
        {
            try
            {
                logger.LogInformation("Read artists: limit - {limit}");

                var listArtist = this.artistService.GetActiveByQuery(limit, pageSize, currentPage, name, code, id).ToList();
                return Ok(BaseResponse<List<ArtistViewModel>>.PrepareDataSuccess(listArtist, "Get list artists successful!"));
            }
            catch (Exception ex)
            {
                logger.LogError(StatusCodes.Status500InternalServerError, ex, "Read list artists exception");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPost("create")]
        public ActionResult Post([FromBody]ArtistViewModel artistAPIVM)
        {
            try
            {
                logger.LogInformation("Create artist: {artistAPIVM}");

                var artistVM = this.artistService.Create(artistAPIVM);
                return Ok(BaseResponse<ArtistViewModel>.PrepareDataSuccess(artistVM, "Create a artist successful!"));
            }
            catch (Exception ex)
            {
                logger.LogError(StatusCodes.Status500InternalServerError, ex, "Create artist exception");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPut("update")]
        public async Task<ActionResult> Put([FromBody]ArtistViewModel artistAPIVM)
        {
            var artistVM = await this.artistService.UpdateAsync(artistAPIVM.Id, artistAPIVM);
            return Ok(BaseResponse<ArtistViewModel>.PrepareDataSuccess(artistVM, "Update the artist successful!"));
        }
        [HttpDelete("delete")]
        public async Task<ActionResult> Delete([FromQuery]ArtistViewModel model)
        {
            var originData = await artistService.FindByIdAsync(model.Id);
            originData.Active = false;
            await this.artistService.UpdateAsync(model.Id, originData);
            return Ok(BaseResponse<ArtistViewModel>.PrepareDataSuccess(model, "Delete the artist successful!"));
        }
    }
}