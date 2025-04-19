using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AV01_PD01_0001.Migrations
{
    /// <inheritdoc />
    public partial class BlockCatalogueUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Movies_BlockId",
                table: "Comments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Movies",
                table: "Movies");

            migrationBuilder.RenameTable(
                name: "Movies",
                newName: "Blocks");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Blocks",
                table: "Blocks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Blocks_BlockId",
                table: "Comments",
                column: "BlockId",
                principalTable: "Blocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Blocks_BlockId",
                table: "Comments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Blocks",
                table: "Blocks");

            migrationBuilder.RenameTable(
                name: "Blocks",
                newName: "Movies");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Movies",
                table: "Movies",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Movies_BlockId",
                table: "Comments",
                column: "BlockId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
