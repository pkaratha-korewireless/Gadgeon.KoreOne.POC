using PoC.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoC.Data.Repository
{
    public interface IElasticRepository
    {
        Task<IEnumerable<Message>> Get();
    }
}
