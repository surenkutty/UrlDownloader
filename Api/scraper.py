import requests

class MusicScraper:
    def __init__(self, base_url):
        self.base_url = base_url

    def search(self, query):
        """
        Search for music based on a query.

        Args:
            query (str): The search query (e.g., song title or artist name).

        Returns:
            dict: A dictionary containing search results.
        """
        try:
            response = requests.get(f'{self.base_url}/search', params={'query': query})
            response.raise_for_status()
            return response.json()  # Assuming the API returns JSON data
        except requests.RequestException as e:
            print(f"Error during search: {e}")
            return {"error": str(e)}

    def download_song(self, song_id, download_path):
        """
        Download a song based on its ID.

        Args:
            song_id (str): The ID of the song to be downloaded.
            download_path (str): The path where the downloaded file should be saved.

        Returns:
            bool: True if the download was successful, False otherwise.
        """
        try:
            response = requests.get(f'{self.base_url}/download/{song_id}', stream=True)
            response.raise_for_status()
            with open(download_path, 'wb') as file:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        file.write(chunk)
            return True
        except requests.RequestException as e:
            print(f"Error during download: {e}")
            return False

# Example usage
if __name__ == "__main__":
    scraper = MusicScraper(base_url='https://api.example.com')
    
    # Search for a song
    query = 'Imagine Dragons Believer'
    search_results = scraper.search(query)
    print("Search Results:", search_results)
    
    # Download a song
    song_id = '12345'
    download_path = f'song_{song_id}.mp3'
    download_success = scraper.download_song(song_id, download_path)
    if download_success:
        print(f"Song downloaded successfully: {download_path}")
    else:
        print("Failed to download song")
