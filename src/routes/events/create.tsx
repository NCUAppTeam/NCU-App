import { createFileRoute, Link } from '@tanstack/react-router';
import { ChangeEvent, useEffect, useState } from 'react';

export const Route = createFileRoute('/events/create')({
  component: CreateEventScreen
})


const styles = {
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  text: {
    fontSize: 17,
    marginLeft: 15,
    color: '#ffffff',
  },
  input: {
    backgroundColor: '#E8E8E8',
    alignSelf: 'center',
    color: '#000000',
    width: '93%',
  },
}

function CreateEventScreen() {
  const [selectedPhotos, setSelectedPhotos] = useState<File>()
  const [preview, setPreview] = useState<string>()

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedPhotos) {
      setPreview(undefined)
      return
    }

    const objectUrl = URL.createObjectURL(selectedPhotos)
    setPreview(objectUrl)

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedPhotos])

  const onSelectPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedPhotos(undefined)
      return
    }
    setSelectedPhotos(e.target.files[0])
  }

  return (
    <div style={styles.container}>
      <div className='flex'>
        <Link to="/events">
          <button className='ms-2 text-white'>返回</button>
        </Link>
        <h1 className='text-xl text-white' style={{ marginLeft: 60 }}>新增活動</h1>
      </div>
      <div className="grid gap-3 grid-cols-1">
        <h2 style={styles.text}>活動名稱</h2>
        <input
          style={styles.input}
          className='rounded'
          placeholder="請輸入活動名稱"
        />
        <div className="flex gap-3 mt-3 ms-4">
          <p style={styles.text}>開始時間</p>
          <input
            type="datetime-local"
            id="start-time"
            name="start-time"
          />
        </div>
        <div className="flex gap-3 mt-3 ms-4">
          <p style={styles.text}>結束時間</p>
          <input
            type="datetime-local"
            id="end-time"
            name="end-time"
          />
        </div>
        <p style={styles.text}>活動地點</p>
        <input
          style={styles.input}
          className="rounded"
          placeholder="請輸入活動地點"
        />
        <p style={styles.text}>參加費用</p>
        <input
          style={styles.input}
          className="rounded"
          placeholder="請輸入參加費用(請輸入數字，無則填0)"
        />
        <p style={styles.text}>活動介紹</p>
        <input
          style={styles.input}
          className="rounded"
          placeholder="請介紹你的活動"
        />
      </div>
      <div className='mt-3 ms-2'>
        <label htmlFor="photo" className='text-white'>上傳照片</label>
        <input
          type="file"
          id="photo"
          name="photo"
          accept="image/png, image/jpeg"
          onChange={onSelectPhoto}
        />
        {
          selectedPhotos && (
            <img src={preview} style={{ width: 200, height: 100 }} />
          )}
      </div>
      <div className='mt-3'>
        <button className='text-white'>確認新增</button>
      </div>
    </div>
  );
}
