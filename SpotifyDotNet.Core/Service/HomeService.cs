using SpotifyDotNet.Core.Interface;
using SpotifyDotNet.Core.Models;
using SpotifyDotNet.Infrastructure.Data;
using SpotifyDotNet.Infrastructure.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SpotifyDotNet.Core.Service
{
    public class HomeService:IHomeService
    {
        private readonly SpotifyDbContext _dbContext;
        public HomeService(SpotifyDbContext dbContext) { _dbContext = dbContext; }

        public async Task<Response> Register(UserSignUp model)
        {
            Response response = new Response();
            try {
                _dbContext.Users.Add(model);
                _dbContext.SaveChanges();
                response.ResponseCode = 200;
                response.ResponseMessage= "OK";
                return response;
            }
            catch(Exception ex)
            {
                response.ResponseCode = 500;
                response.ResponseMessage = ex.Message;
                return response;
            }

        }
    }
}
