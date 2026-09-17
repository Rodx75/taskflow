using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TaskFlow.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 120, nullable: false),
                    Description = table.Column<string>(type: "TEXT", maxLength: 500, nullable: true),
                    Category = table.Column<string>(type: "TEXT", maxLength: 40, nullable: false),
                    Priority = table.Column<int>(type: "INTEGER", nullable: false),
                    IsCompleted = table.Column<bool>(type: "INTEGER", nullable: false),
                    DueDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "Category", "CreatedAt", "Description", "DueDate", "IsCompleted", "Priority", "Title" },
                values: new object[,]
                {
                    { 1, "Planning", new DateTime(2026, 9, 1, 9, 0, 0, 0, DateTimeKind.Utc), "Define entities, relationships and constraints for TaskFlow.", null, true, 2, "Design the database schema" },
                    { 2, "Backend", new DateTime(2026, 9, 3, 9, 0, 0, 0, DateTimeKind.Utc), "CRUD endpoints with ASP.NET Core and EF Core.", null, true, 2, "Build the Tasks REST API" },
                    { 3, "Frontend", new DateTime(2026, 9, 5, 9, 0, 0, 0, DateTimeKind.Utc), "Fetch tasks from the API and render the board.", new DateTime(2026, 9, 20, 0, 0, 0, 0, DateTimeKind.Utc), false, 1, "Connect the React frontend" },
                    { 4, "Docs", new DateTime(2026, 9, 6, 9, 0, 0, 0, DateTimeKind.Utc), "Document setup steps and add screenshots.", null, false, 0, "Write the README" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tasks");
        }
    }
}
