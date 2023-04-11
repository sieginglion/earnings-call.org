import subprocess
import time


def run(c):
    print(subprocess.run(c, shell=True, capture_output=True, text=True, check=True))

while True:
    try:
        with open('tasks', 'r') as file:
            first_line = file.readline()
            remaining_lines = file.readlines()

        with open('tasks', 'w') as file:
            file.writelines(remaining_lines)

        first_line = first_line.strip()
        if not first_line:
            raise ValueError
        symbol, url, lang = first_line.split(', ')
        run('rm -f audio video output*.mp3')
        try:
            run(f'yt-dlp -o audio -f bestaudio {url}')
        except:
            run(f'yt-dlp -o video {url}')
            run(f'ffmpeg -i video -vn -acodec libmp3lame -f mp3 audio')
        run('ffmpeg -i audio -c:a libmp3lame -b:a 128k output.mp3')
        run('ffmpeg -i output.mp3 -f segment -segment_time 450 -c copy output_prefix_%03d.mp3')
        import glob
        import os
        import requests

        # Find all files matching output_prefix*.mp3
        file_paths = glob.glob("output_prefix*.mp3")
        for file_path in sorted(file_paths):
            run(f'curl https://api.openai.com/v1/audio/transcriptions -H "Authorization: Bearer <SECRET>" -H "Content-Type: multipart/form-data" -F file="@./{file_path}" -F model="whisper-1" -F language="{lang}" >>transcript')
        run(f'mv transcript ./tw/{symbol}')
    except:
        pass
    time.sleep(10)
