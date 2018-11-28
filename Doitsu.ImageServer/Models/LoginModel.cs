using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Doitsu.ImageServer.API.Models
{
    public class LoginModel
    {
        //
        // Summary:
        //     This API supports the ASP.NET Core Identity default UI infrastructure and is
        //     not intended to be used directly from your code. This API may change or be removed
        //     in future releases.
        [EmailAddress]
        [Required]
        public string Email { get; set; }
        //
        // Summary:
        //     This API supports the ASP.NET Core Identity default UI infrastructure and is
        //     not intended to be used directly from your code. This API may change or be removed
        //     in future releases.
        [DataType(DataType.Password)]
        [Required]
        public string Password { get; set; }
        //
        // Summary:
        //     This API supports the ASP.NET Core Identity default UI infrastructure and is
        //     not intended to be used directly from your code. This API may change or be removed
        //     in future releases.
        public bool RememberMe { get; set; }
    }
}
