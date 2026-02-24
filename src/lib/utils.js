/**
 * Helper function to resolve static asset paths for GitHub Pages deployment.
 * Standard Next.js <Image> and <Link> components handle basePath automatically,
 * but regular <img> tags, CSS background URLs, or JS static paths need this wrapper.
 *
 * @param {string} path - The original root-relative path (e.g., "/images/logo.png")
 * @returns {string} The path with the basePath prepended
 */
export function getAssetPath(path) {
    // Define your repository mapping path here
    // Make sure this matches the basePath in next.config.mjs
    const basePath = '/v2x-protocol-toolkit';

    if (!path) return '';

    // If the path is already absolute or already contains the base path, return as is
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith(basePath)) {
        return path;
    }

    // Ensure the original path starts with a slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${basePath}${normalizedPath}`;
}
