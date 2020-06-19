import React from "react"
import anime from "animejs"

export const Amazing: React.FC = () => {
  React.useEffect(() => {
    anime({
      targets: "#amazing path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 1500,
      delay: function (el, i) {
        return i * 250
      },
      direction: "alternate",
      loop: true, //false, //true,
    })
  }, [])

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="297mm" width="210mm" version="1.1" viewBox="0 0 210 297" id="amazing">
      <g
        aria-label="Amazing"
        style={{
          fontVariantLigatures: "normal",
          fontVariantNumeric: "normal",
          fontVariantCaps: "normal",
          fontFeatureSettings: "normal",
        }}
        fill="none"
        stroke="#e61ad8"
        strokeOpacity="0.935"
        strokeWidth="0.794"
      >
        <path
          style={{
            fontVariantLigatures: "normal",
            fontVariantNumeric: "normal",
            fontVariantCaps: "normal",
            fontFeatureSettings: "normal",
          }}
          d="m32.376 89.954h-16.396l-3.721 10.116h-3.1994l13.667-36.111h2.9021l13.668 36.111h-3.175zm-15.453-2.604h14.486l-7.243-19.671z"
        />
        <path
          style={{
            fontVariantLigatures: "normal",
            fontVariantNumeric: "normal",
            fontVariantCaps: "normal",
            fontFeatureSettings: "normal",
          }}
          d="m46.639 73.236 0.09922 4.3656q1.4883-2.4309 3.7207-3.6463t4.9609-1.2154q6.35 0 8.0615 5.209 1.4387-2.5053 3.8447-3.8447 2.4061-1.3643 5.3082-1.3643 8.632 0 8.8057 9.4258v17.904h-2.977v-17.681q-0.02481-3.5967-1.5627-5.333-1.5131-1.7363-4.9609-1.7363-3.1998 0.04961-5.4074 2.0836-2.2076 2.0092-2.4557 4.9113v17.755h-2.976v-17.905q-0.02481-3.4479-1.6371-5.1346-1.5875-1.7115-4.9113-1.7115-2.8029 0-4.8121 1.6123-2.0092 1.5875-2.9766 4.7377v18.401h-2.977v-26.834z"
        />
        <path
          style={{
            fontVariantLigatures: "normal",
            fontVariantNumeric: "normal",
            fontVariantCaps: "normal",
            fontFeatureSettings: "normal",
          }}
          d="m105.92 100.07q-0.44648-1.265-0.57051-3.7455-1.5627 2.034-3.9936 3.1502-2.4061 1.0914-5.1098 1.0914-3.8695 0-6.2756-2.158-2.3812-2.158-2.3812-5.457 0-3.9191 3.2494-6.2012 3.2742-2.282 9.1033-2.282h5.3826v-3.051q0-2.8773-1.7859-4.5145-1.7611-1.6619-5.1594-1.6619-3.1006 0-5.1346 1.5875t-2.034 3.8199l-2.9766-0.02481q0-3.1998 2.9766-5.5314 2.9766-2.3564 7.3174-2.3564 4.4896 0 7.0693 2.2572 2.6045 2.2324 2.6789 6.2508v12.7q0 3.8943 0.81855 5.8291v0.29765zm-9.3266-2.1332q2.9766 0 5.3082-1.4387 2.3564-1.4387 3.423-3.8447v-5.9035h-5.3082q-4.44 0.04961-6.9453 1.6371-2.5053 1.5627-2.5053 4.316 0 2.2572 1.6619 3.7455 1.6867 1.4883 4.3656 1.4883z"
        />
        <path
          style={{
            fontVariantLigatures: "normal",
            fontVariantNumeric: "normal",
            fontVariantCaps: "normal",
            fontFeatureSettings: "normal",
          }}
          d="m118.13 97.569h17.438v2.501h-21.12v-2.178l16.28-22.101h-15.78v-2.555h19.521v2.2076z"
        />
        <path
          style={{
            fontVariantLigatures: "normal",
            fontVariantNumeric: "normal",
            fontVariantCaps: "normal",
            fontFeatureSettings: "normal",
          }}
          d="m144.2 100.07h-2.98v-26.834h2.9766zm-3.5-34.598q0-0.84336 0.5457-1.4139 0.54571-0.59531 1.4883-0.59531 0.94258 0 1.4883 0.59531 0.5705 0.57051 0.5705 1.4139 0 0.84336-0.5705 1.4139-0.54571 0.57051-1.4883 0.57051-0.94257 0-1.4883-0.57051-0.5457-0.57051-0.5457-1.4139z"
        />
        <path
          style={{
            fontVariantLigatures: "normal",
            fontVariantNumeric: "normal",
            fontVariantCaps: "normal",
            fontFeatureSettings: "normal",
          }}
          d="m155.11 73.236 0.0992 4.5889q1.5131-2.4805 3.7703-3.7703 2.2572-1.3146 4.9858-1.3146 4.316 0 6.4244 2.4309t2.1332 7.2926v17.606h-2.9518v-17.632q-0.0248-3.5967-1.5379-5.3578-1.4883-1.7611-4.7873-1.7611-2.7533 0-4.8865 1.7363-2.1084 1.7115-3.1254 4.6385v18.376h-2.9518v-26.834z"
        />
        <path
          style={{
            fontVariantLigatures: "normal",
            fontVariantNumeric: "normal",
            fontVariantCaps: "normal",
            fontFeatureSettings: "normal",
          }}
          d="m178.97 86.407q0-6.3004 2.7781-9.9715 2.8029-3.6959 7.5902-3.6959 5.4818 0 8.3344 4.3656l0.14883-3.8695h2.7781v26.293q0 5.1842-2.9022 8.2104-2.9021 3.0262-7.8631 3.0262-2.8029 0-5.3578-1.265-2.5301-1.2402-3.9936-3.3238l1.6619-1.7859q3.1502 3.8695 7.491 3.8695 3.7207 0 5.8043-2.2076 2.0836-2.1828 2.158-6.0771v-3.3734q-2.8525 3.9688-8.3096 3.9688-4.6633 0-7.491-3.7207t-2.8277-10.046zm3.0014 0.5209q0 5.1346 2.0588 8.1111 2.0588 2.9518 5.8043 2.9518 5.4818 0 7.7639-4.9113v-12.477q-1.0418-2.5797-3.0014-3.9191-1.9596-1.3643-4.7129-1.3643-3.7455 0-5.8291 2.9518-2.0836 2.927-2.0836 8.6568z"
        />
      </g>
    </svg>
  )
}
