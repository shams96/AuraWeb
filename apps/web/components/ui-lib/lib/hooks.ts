import { useState, useEffect, useRef, useCallback } from 'react'
import { debounce, throttle } from './utils'

// Hook for managing local storage
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}

// Hook for managing click outside
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handler])

  return ref
}

// Hook for managing media queries
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)
    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

// Hook for managing scroll position
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset)
    }
    window.addEventListener('scroll', updatePosition)
    updatePosition()
    return () => window.removeEventListener('scroll', updatePosition)
  }, [])

  return scrollPosition
}

// Hook for managing window size
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

// Hook for managing copy to clipboard
export function useCopyToClipboard(): [boolean, (text: string) => Promise<void>] {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text: ', error)
      setIsCopied(false)
    }
  }, [])

  return [isCopied, copyToClipboard]
}

// Hook for managing async operations
export function useAsync<T, E = string>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  const execute = useCallback(() => {
    setStatus('pending')
    setValue(null)
    setError(null)

    return asyncFunction()
      .then((response) => {
        setValue(response)
        setStatus('success')
      })
      .catch((error) => {
        setError(error)
        setStatus('error')
      })
  }, [asyncFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { execute, status, value, error }
}

// Hook for managing form state
export function useForm<T extends Record<string, any>>(
  initialValues: T,
  onSubmit: (values: T) => void | Promise<void>
) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

  const setValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }, [errors])

  const setError = useCallback((name: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }))
  }, [])

  const setTouchedField = useCallback((name: keyof T, isTouched = true) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }))
  }, [])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault()
      }
      
      // Mark all fields as touched
      const allTouched = Object.keys(initialValues).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      ) as Partial<Record<keyof T, boolean>>
      
      setTouched(allTouched)
      
      // Validate form
      const newErrors: Partial<Record<keyof T, string>> = {}
      Object.keys(initialValues).forEach((key) => {
        if (!values[key as keyof T]) {
          newErrors[key as keyof T] = 'This field is required'
        }
      })
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }
      
      try {
        await onSubmit(values)
      } catch (error) {
        console.error('Form submission error:', error)
      }
    },
    [values, onSubmit, initialValues]
  )

  return {
    values,
    errors,
    touched,
    setValue,
    setError,
    setTouched: setTouchedField,
    resetForm,
    handleSubmit,
  }
}

// Hook for managing product variants
export function useProductVariants(
  variants: Array<{ id: string; name: string; values: string[] }>
) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [availableOptions, setAvailableOptions] = useState<Record<string, string[]>>({})

  useEffect(() => {
    // Initialize available options
    const initialOptions: Record<string, string[]> = {}
    variants.forEach((variant) => {
      initialOptions[variant.name] = variant.values
    })
    setAvailableOptions(initialOptions)
  }, [variants])

  const selectOption = (name: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [name]: value }))
  }

  const getSelectedVariant = () => {
    // This would typically query your variants to find the matching one
    // For now, we'll just return the selected options
    return selectedOptions
  }

  const isVariantSelected = (variantId: string) => {
    // This would check if the current selection matches a variant
    // For now, we'll return false
    return false
  }

  return {
    selectedOptions,
    availableOptions,
    selectOption,
    getSelectedVariant,
    isVariantSelected,
  }
}
