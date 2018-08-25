using MongoDB.Driver;
using serverapi.Dac.Contract;
using serverapi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Authentication;
using System.Threading.Tasks;

namespace serverapi.Dac
{
    public class SlotDac : ISlotDac
    {
        IMongoCollection<Slot> Collection { get; set; }

        public SlotDac(DatabaseConfigurations config)
        {
            var settings = MongoClientSettings.FromUrl(new MongoUrl(config.MongoDBConnection));
            settings.SslSettings = new SslSettings()
            {
                EnabledSslProtocols = SslProtocols.Tls12
            };
            var mongoClient = new MongoClient(settings);
            var database = mongoClient.GetDatabase(config.DatabaseName);
            Collection = database.GetCollection<Slot>("slot");
        }

        public Slot Get(Expression<Func<Slot, bool>> expression)
        {
            return Collection.Find(expression).FirstOrDefault();
        }

        public IEnumerable<Slot> List(Expression<Func<Slot, bool>> expression)
        {
            return Collection.Find(expression).ToList();
        }

        public void Create(Slot document)
        {
            Collection.InsertOne(document);
        }

        public void Update(Slot document)
        {
            Collection.ReplaceOne(it => it.Id == document.Id, document);
        }
    }
}
