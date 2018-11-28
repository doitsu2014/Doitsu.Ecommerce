using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using Doitsu.Fandom.API.Models;
using Doitsu.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace Doitsu.Fandom.API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private IHostingEnvironment _hostingEnvironment;
        private IConfiguration _configuration;

        public ImageController(IHostingEnvironment hostingEnvironment, IConfiguration configuration)
        {
            _hostingEnvironment = hostingEnvironment;
            _configuration = configuration;
        }

        [HttpPost("uploads")]
        public async Task<ActionResult> UploadFileAsync(List<IFormFile> files)
        {
            try
            {
                string webRootPath = _hostingEnvironment.WebRootPath;
                string container = _configuration.GetSection("ImageContainerPath").Value;
                string userId = User.Claims.FirstOrDefault(p => p.Type == ClaimTypes.NameIdentifier)?.Value;
                string folderName = $"{container}/{userId}";
                string uploadPath = Path.Combine(webRootPath, folderName);

                Dictionary<string, string> result = new Dictionary<string, string>();

                foreach (var file in files)
                {
                    string fileName = file.FileName;

                    if (file.Length > 0)
                    {
                        if(!Directory.Exists(uploadPath))
                        {
                            Directory.CreateDirectory(uploadPath);
                        }
                        using (var fileStream = new FileStream(Path.Combine(uploadPath, fileName), FileMode.Create))
                        {

                            await file.CopyToAsync(fileStream);
                        }
                    }

                    var hostName = Request.Host;
                    var scheme = Request.Scheme;
                    var imageLink = $"{scheme}://{hostName}/{folderName}/{fileName}";
                    
                    result.Add(file.FileName, imageLink);
                }

                return Ok(BaseResponse<dynamic>.PrepareDataSuccess(result));
            }
            catch (Exception ex)
            {
                return BadRequest(BaseResponse<dynamic>.PrepareDataFail(new { data = ex.Data, message = ex.Message, stackTrace = ex.StackTrace }));
            }
        }


    }
}