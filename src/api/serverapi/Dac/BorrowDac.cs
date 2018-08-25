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
    public class BorrowDac : IBorrowDac
    {
        IMongoCollection<Borrow> Collection { get; set; }

        public BorrowDac(DatabaseConfigurations config)
        {
            var settings = MongoClientSettings.FromUrl(new MongoUrl(config.MongoDBConnection));
            settings.SslSettings = new SslSettings()
            {
                EnabledSslProtocols = SslProtocols.Tls12
            };
            var mongoClient = new MongoClient(settings);
            var database = mongoClient.GetDatabase(config.DatabaseName);
            Collection = database.GetCollection<Borrow>("borrow");
        }

        public Borrow Get(Expression<Func<Borrow, bool>> expression)
        {
            return Collection.Find(expression).FirstOrDefault();
        }

        public IEnumerable<Borrow> List(Expression<Func<Borrow, bool>> expression)
        {
            return Collection.Find(expression).ToList();
        }

        public void Create(Borrow document)
        {
            Collection.InsertOne(document);
        }

        public void Update(Borrow document)
        {
            Collection.ReplaceOne(it => it.Id == document.Id, document);
        }

        public void Remove(Borrow document)
        {
            Collection.DeleteOne(it => it.Id == document.Id);
        }
    }
}
