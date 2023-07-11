/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import axios from "axios";
import Link from "./Link";

function App() {
  const [urlValue, setUrlValue] = useState("");
  const [data, setData] = useState<object>();
  const [isVideo, setAudio] = useState(true);
  const justAButton = async (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(`http://localhost:4000/download?url=${urlValue}`);
    const data: object = await axios.get(
      `https://ytdl-p163.onrender.com/download?url=${urlValue}`
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setData(data);
    setUrlValue("");
  };

  return (
    <>
      <div className=''>
        <form action='' onSubmit={justAButton}>
          <input
            required
            aria-required
            type='text'
            name=''
            id=''
            placeholder='Enter Youtube Link'
            value={urlValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUrlValue(e.target.value)
            }
          />
          <button type='submit'>Fetch Video</button>
        </form>
      </div>

      <div className='' style={{ marginTop: 20 }}>
        {data ? (
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          <div className=''>
            <iframe
              src={data.data.url}
              width={500}
              height={500}
              title={data.data.details.title}
            />
            <h3>{data.data.details.title}</h3>

            <div className=''>
              <div className=''>
                <button onClick={() => setAudio(() => true)}>Video</button>
                <button onClick={() => setAudio(() => false)}>Audio </button>
              </div>
              <div
                className=''
                style={{
                  marginTop: 50,
                }}>
                <table>
                  <tr>
                    <th style={{ width: "200px" }}>File Name</th>
                    <th>File Type</th>
                    <th>Action</th>
                  </tr>
                  <tbody>
                    {isVideo
                      ? data?.data.videos.map(
                          ({ url, mimeType, height, hasVideo }) => (
                            <tr>
                              <td> {mimeType.split(";")[0] + " "}</td>
                              <td>{hasVideo ? `${height}` + `p` : ""}</td>
                              <td>
                                <Link url={url} />
                              </td>
                            </tr>
                          )
                        )
                      : data?.data.audios.map(
                          ({ url, mimeType, height, hasVideo }) => (
                            <tr>
                              <td> {mimeType.split(";")[0] + " "}</td>
                              <td>{hasVideo ? `${height}` + `p` : ""}</td>
                              <td>
                                <Link url={url} />
                              </td>
                            </tr>
                          )
                        )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <h3>No Downloads Yet</h3>
        )}
      </div>
    </>
  );
}

export default App;

// {data?.data.videos.map(
//     ({ url, mimeType, height, hasVideo }) => (
//       <table>
//         <th>
//           <tr>Name</tr>
//         </th>
//       </table>
//     )
//   )}
{
  /* <div className=''>
<Link
  url={url}
  mimType={mimeType}
  height={height}
  hasVideo={hasVideo}
/>
</div> */
}
