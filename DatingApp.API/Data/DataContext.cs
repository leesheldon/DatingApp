using DatingApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int, 
        IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        
        public DbSet<Photo> Photos { get; set; }

        public DbSet<Like> Likes { get; set; }

        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole => 
            {
                userRole.HasKey(ur => new {ur.UserId, ur.RoleId});

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            });            

            builder.Entity<Like>()
                .HasKey(k => new { k.LikerId, k.LikeeId });

            builder.Entity<Like>()
                .HasOne(p => p.Likee)
                .WithMany(p => p.Likers)
                .HasForeignKey(p => p.LikeeId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Like>()
                .HasOne(p => p.Liker)
                .WithMany(p => p.Likees)
                .HasForeignKey(p => p.LikerId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(p => p.Sender)
                .WithMany(p => p.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(p => p.Recipient)
                .WithMany(p => p.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Photo>().HasQueryFilter(p => p.IsApproved);
        }
    }
}