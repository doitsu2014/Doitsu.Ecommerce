using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Doitsu.DBManager.Image_Server.Models.Entities;
using Doitsu.ImageServer.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Doitsu.ImageServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        public UserManager<ApplicationUser> _userManager;
        public AuthorizeController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login([FromBody]LoginModel loginModel)
        {
            var user = await _userManager.FindByEmailAsync(loginModel.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password))
            {
                try
                {
                    var result = await user.AuthorizeAsync(_userManager, user);

                    // return basic user info (without password) and token to store client side
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex);
                }
            }
            return Unauthorized();
        }


        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<bool>> RegisterAsync([FromBody]RegisterModel registerModel)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var email = registerModel.Email;
                var password = registerModel.Password;
                var confirmPassword = registerModel.ConfirmPassword;
                ApplicationUser newUser = new ApplicationUser()
                {
                    Email = email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = email
                };
                await _userManager.CreateAsync(newUser, password);
                await _userManager.AddToRoleAsync(newUser, "ActiveUser");

                // Add role Administrator if register to admin
                var defaultAdminToken = "doitsu_admin";
                if (registerModel.IsAdmin)
                {
                    if (registerModel.RegisAdminToken == defaultAdminToken)
                    {
                        await _userManager.AddToRoleAsync(newUser, "Administrator");
                    }
                }else
                {
                    await _userManager.AddToRoleAsync(newUser, "ImageUploader");
                }

                return Ok(BaseResponse<dynamic>.PrepareDataSuccess(new { email = email }, $"You have been registered your account."));
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}