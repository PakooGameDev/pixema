// src/components/TagSelector/TagSelector.tsx
import React from 'react';
import styles from './TagSelector.module.scss';
import TagCard from './TagCard/TagCard'
import useTagSelector from '../../lib/hooks/useTagSelector';

interface TagSelectorProps {
    label?: string;
    className?: string;
    initialTags?: string[]; 
    onChange?: (tags: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ label, className, initialTags = [], onChange }) => {
    const { tags, inputValue, inputRef, addTag, removeTag, handleKeyDown, handleInputChange } = useTagSelector(initialTags);

    // Обновляем родительский компонент при изменении тегов
    React.useEffect(() => {
        if (onChange) {
            onChange(tags);
        }
    }, [tags, onChange]);

    return (
        <div className={styles.tag}>
            {label && <label className={styles.tag__label}>{label}</label>}
            <div className={`${styles.tag__content} ${className}`}>
                {tags.map((tag, index) => (
                    <TagCard key={index} id={index} text={tag} onClick={() => removeTag(tag)} />
                ))}
                <input 
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                    className={styles.tag__input}
                    placeholder="Your tag"
                />
            </div>
        </div>
    );
};

export default TagSelector;
