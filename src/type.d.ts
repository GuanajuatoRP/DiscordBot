declare namespace NodeJS {
	export interface ProcessEnv {
		readonly MODE: 'development' | 'production';
	}
}
