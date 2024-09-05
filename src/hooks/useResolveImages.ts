import { openDir } from "$backend/open";
import {
	FileEntry,
	readDir,
} from "@tauri-apps/api/fs";
import {
	appLocalDataDir,
	join,
} from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";

const resolveDir = async (dirPath: string[]) => {
	const base = await appLocalDataDir();
	const path = await join(base, ...dirPath);
	return path;
};

const REGEX =
	/([^\\\/]+\.(jpg|jpeg|png|gif|webp|svg|apng|bmp|ico))$/i;

const resolveDirEntries = async (
	dirPath: string[],
) => {
	const entries: FileEntry[] = await readDir(
		await resolveDir(dirPath),
	).then(
		(ok) => ok,
		() => [],
	);
	return entries;
};

export const useResolveImages = (
	dirPath: string[],
) => {
	const isBusy = useRef(false);
	const [images, setImages] = useState<
		{
			path: string;
			name: string;
			src: string;
		}[]
	>([]);

	useEffect(() => {
		(async () => {
			if (isBusy.current) {
				return;
			}
			isBusy.current;
			const entries = await resolveDirEntries(
				dirPath,
			);

			const items: typeof images = [];
			for (const entry of entries) {
				if (
					entry.children !== undefined ||
					entry.name === undefined ||
					!REGEX.test(entry.name)
				) {
					continue;
				}
				items.push({
					name: entry.name,
					path: entry.path,
					src: convertFileSrc(entry.path),
				});
			}
			setImages(items);
			isBusy.current = false;
		})();
	}, [dirPath]);

	const handleDirOpen = useCallback(async () => {
		openDir(await resolveDir(dirPath));
	}, [dirPath]);

	return {
		images,
		handleDirOpen,
	};
};
