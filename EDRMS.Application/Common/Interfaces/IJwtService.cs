using EDRMS.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace EDRMS.Application.Common.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(AppUser user, IList<string> roles);
    }
}
