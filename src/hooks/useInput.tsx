import React, {ChangeEvent, useState} from "react"

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)
  
  const reset = () => {
    setValue("")
  }

  return {
    value: value,
    onChange: (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    reset
  }
}

export default useInput