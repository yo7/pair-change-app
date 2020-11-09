import React from "react"
import { css } from "linaria"
import { NextPage } from "next"
import { shuffle, times } from "lodash"

const IndexPage: NextPage = () => {
  const [members, setMembers] = React.useState<string[]>([])
  const [slots, setSlots] = React.useState(8)

  const handleChangeMembers = (text: string) => {
    const regex = /\s*(?:,|、)\s*/
    setMembers(text.split(regex))
  }

  const handleChangeSlots = (text: string) => {
    setSlots(parseInt(text, 10))
  }

  const memberPairs = () => {
    return eachSlice(shuffle(members))
  }

  const memberPairsList = () => {
    let list: string[][][] = []
    times(slots, (i) => {
      list.push(memberPairs())
      // いい感じにする
    })
    return list
  }

  return (
    <div
      className={css`
        max-width: 640px;
        margin: 0 auto;
        padding: 0 15px;
      `}
    >
      <h1
        className={css`
          font-size: 55px;
          text-align: center;
        `}
      >
        ぺあちぇん！
      </h1>
      <div
        className={css`
          margin-top: 20px;
        `}
      >
        <div>
          <div>メンバーをカンマ区切りで入れてね！</div>
          <input
            onChange={(e) => handleChangeMembers(e.currentTarget.value)}
            className={css`
              border-radius: 10px;
              height: 30px;
              width: 100%;
              margin-top: 10px;
              padding: 3px 10px;
            `}
          ></input>
        </div>
        <div
          className={css`
            margin-top: 50px;
            display: flex;
          `}
        >
          <div>コマ数を入れてね！</div>
          <input
            type="number"
            value={slots}
            onChange={(e) => handleChangeSlots(e.currentTarget.value)}
            className={css`
              border-radius: 10px;
              height: 30px;
              width: 70px;
              margin-left: 15px;
              padding: 3px 10px;
            `}
          ></input>
        </div>
      </div>
      {members.length > 1 && slots > 0 && (
        <div
          className={css`
            margin-top: 50px;
          `}
        >
          <div>コマ割りを出したよ！</div>
          <table
            className={css`
              margin-top: 30px;
              th,
              td {
                min-width: 100px;
                height: 50px;
                padding: 5px 15px;
              }
            `}
          >
            <thead>
              <tr>
                <th />
                {[...Array(Math.floor(members.length / 2))].map((_, i) => (
                  <th>{i + 1}ペア目</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {memberPairsList().map((list, i) => {
                return (
                  <tr>
                    <td>{i + 1}コマ目</td>
                    {list.map((pair) => (
                      <td>{pair.join("、 ")}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const eachSlice = (arr: any[], n = 2) => {
  const eachSliceExecute = (arr: any[], n = 2, result: any[] = []): any[][] => {
    if (arr.length === 0) {
      return result
    }

    return eachSliceExecute(arr, n, [...result, arr.splice(0, n)])
  }

  return eachSliceExecute([...arr], n)
}

export default IndexPage
