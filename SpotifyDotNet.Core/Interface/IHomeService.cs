using SpotifyDotNet.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpotifyDotNet.Core.Interface
{
    public interface IHomeService
    {
        public Task<Response> Register(UserSignUp model);
    }
}
