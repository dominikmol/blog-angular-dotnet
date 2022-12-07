using Microsoft.AspNetCore.Mvc;
using BlogAPI.Models;
using BlogAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace BlogAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ArticlesController : ControllerBase
    {
        private readonly ApiContext _context;

        public ArticlesController(ApiContext context)
        {
            _context = context;
        }

        // add new article from database
        [HttpPost]
        public async Task<IActionResult> CreateArticle([FromBody] Articles article)
        {
            if (article.Id != 0)
            {
                return NoContent();
            }

            await _context.Articles.AddAsync(article);
            await _context.SaveChangesAsync();
            return Ok(article);
        }

        // update specific article from database
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateArticle([FromRoute] int id, Articles updateArticle)
        {
            var article = await _context.Articles.FindAsync(id);

            if (article == null)
            {
                return NotFound();
            }

            article.Title = updateArticle.Title;
            article.Author = updateArticle.Author;
            article.Content = updateArticle.Content;
            article.ArticleStatus = updateArticle.ArticleStatus;
            article.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            return Ok(article);
        }

        // get specific article from database
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetArticle([FromRoute] int id)
        {
            var result = await _context.Articles.FindAsync(id);

            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        // get all articles from database
        [HttpGet()]
        public async Task<IActionResult> GetAllArticle()
        {
            var result = await _context.Articles.ToListAsync();
            return Ok(result);
        }

        // get all articles from database
        [HttpGet()]
        public async Task<IActionResult> GetPublishedArticle()
        {
            // var result = await _context.Articles.ToListAsync();
            var result = await _context.Articles.Where(a => a.ArticleStatus.Contains("Published")).ToListAsync();
            return Ok(result);
        }

        // delete specific article from database
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteArticle([FromRoute] int id)
        {
            var result = await _context.Articles.FindAsync(id);

            if (result == null)
            {
                return NotFound();
            }
            
            _context.Articles.Remove(result);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        
    }
}
