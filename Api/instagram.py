from instaloader import Instaloader, Post

def instagram_video_url(post_url):
    try:
        loader = Instaloader()
        shortcode = post_url.split('/')[-2]
        post = Post.from_shortcode(loader.context, shortcode)
        return post.video_url
    except Exception as e:
        return str(e)