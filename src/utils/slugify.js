export function createSlug(text) {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ñ/g, 'n')
        .replace(/ü/g, 'u')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

export function extractText(children) {
    return children
        .map(child => {
            if (typeof child === 'string') return child;
            if (child.props?.children) {
                return typeof child.props.children === 'string' 
                    ? child.props.children 
                    : extractText(Array.isArray(child.props.children) ? child.props.children : [child.props.children]);
            }
            return '';
        })
        .join('');
}