using Microsoft.AspNetCore.Identity;

namespace EDRMS.Domain.Entities;

public class AppUser : IdentityUser
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime CreateAt { get; set; } = DateTime.UtcNow;

}
