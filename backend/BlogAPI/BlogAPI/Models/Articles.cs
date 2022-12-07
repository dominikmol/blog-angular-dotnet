namespace BlogAPI.Models
{
    public class Articles
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Author { get; set; }
        public required string Content { get; set; }
        public required string ArticleStatus { get; set; }
        public required DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set;}
    }

    // Add-Migration "Initial Migration"
    // Update-Database
}
