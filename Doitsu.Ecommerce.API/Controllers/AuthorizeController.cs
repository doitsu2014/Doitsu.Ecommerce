
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Doitsu.Ecommerce.API.Models;
using Doitsu.Service.Identities;
using Doitsu.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
//using Microsoft.AspNetCore.Mvc.Attributes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Doitsu.Ecommerce.API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
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


        [HttpPost]
        [Route("register")]
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
                return Ok(true);
            }
            catch
            {
                return NotFound();
            }
        }
    }
}
