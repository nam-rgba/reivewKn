import { useRef, useEffect, useState, useCallback } from 'react';

interface DropdownProps {
  initialIsVisible?: boolean;
}

interface DropdownResult {
  isOpen: boolean;
  toggleDropdown: () => void;
  dropdownRef: React.RefObject<HTMLDivElement>;
}


export const useDropdown = ({ initialIsVisible = false }: DropdownProps = {}): DropdownResult => {
  /**
 * Creates a dropdown hook with the initial visibility state and click outside
 * functionality.
 *
 * @param {DropdownProps} initialIsVisible - the initial visibility state
 * @return {DropdownResult} object containing the visibility state, toggle
 * function, and dropdown reference
 */

  // State to store the visibility
  const [isOpen, setIsVisible] = useState(initialIsVisible);
  // Reference to the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to handle click outside
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsVisible(false);
    }
  }, [setIsVisible]);

  // Function to toggle the visibility
  const toggleDropdown = useCallback(() => {
    setIsVisible((prevVisible) => !prevVisible);
  }, [setIsVisible]);

  // Add event listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return { isOpen, toggleDropdown, dropdownRef };
};


