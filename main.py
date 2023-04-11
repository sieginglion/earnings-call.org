import uvicorn
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()
app.mount('/app', StaticFiles(directory='.'))


class Item(BaseModel):
    symbol: str
    url: str
    lang: str


@app.post('/add')
async def add(item: Item):
    with open('tasks', mode='a') as file:
        file.write(f'{item.symbol}, {item.url}, {item.lang}')
    return 'ok'


if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8081)
