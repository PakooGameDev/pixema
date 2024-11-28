// src/hooks/useTagSelector.ts
import { useState, useRef } from 'react';

const useTagSelector = (initialValue: string[] = []) => {
    const [tags, setTags] = useState<string[]>(initialValue);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [inputValue, setInputValue] = useState('');

    const addTag = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue && !tags.includes(trimmedValue)) {
            setTags((prevTags) => [...prevTags, trimmedValue]);
            setInputValue('');
            inputRef.current?.focus();
        }
    };

    const removeTag = (tag: string) => {
        setTags((prevTags) => prevTags.filter(t => t !== tag));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return {
        tags,
        inputValue,
        inputRef,
        addTag,
        removeTag,
        handleKeyDown,
        handleInputChange,
    };
};

export default useTagSelector;
