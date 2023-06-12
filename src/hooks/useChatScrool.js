const { useRef, useEffect } = require("react");

export default function ChatScroll(dep) {
    const ref = useRef()
    useEffect(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, [dep]);

    return ref;
  }