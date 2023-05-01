'use client'

import { VStack } from 'every-layout/src/web/vstack'

export default function Home() {
  return (
    <>
      <VStack space="1em" className="root">
        <h1>Home</h1>
        <div className="row">
          <div className="item one">
            <p>one</p>
            <div className="test">test</div>
          </div>
          <div className="item two">
            <p>two</p>
            <div className="test">test</div>
          </div>
        </div>
      </VStack>

      <style jsx>{`
        .root {
          container: root / size;
        }

        .row {
          display: flex;
          gap: 1em;
          background-color: azure;
        }

        .item {
          background-color: aliceblue;
          padding: 1em;
          border-radius: 0.2em;
          container: item / size;
        }

        .one {
          flex-grow: 2;
        }

        .two {
          flex-grow: 1;
        }

        @container item (min-width: 200px) {
          .test {
            background-color: green;
          }
        }

        @container item (min-width: 600px) {
          .test {
            background-color: red;
          }
        }
        .test {
        }
      `}</style>
    </>
  )
}
