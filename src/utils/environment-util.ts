export class EnvironmentUtils {

	public static getAuthenticationInfo(userType: string) {
		let username: string | undefined, password: string | undefined;
		switch (userType) {
			case 'Root Admin':
				username = process.env.root_admin_username || '';
				password = process.env.root_admin_password || '';
				break;

			case 'ZP Admin':
				username = process.env.zp_admin_username || '';
				password = process.env.zp_admin_password || '';
				break;

			default:
				username = process.env.root_admin_username || '';
				password = process.env.root_admin_password || '';
				break;
		}

		return { username, password };
	}


	public static getEnvironmentInfo(envTest: string, market: string) {
		let envFileName: string;
		switch (market) {
			case 'HK':
				envFileName = envTest === 'dev' ? 'dev.env' : (envTest === 'prod' ? 'prod-hk.env' : 'uat-hk.env');
				break;

			case 'SG':
				envFileName = envTest === 'dev' ? 'dev.env' : (envTest === 'prod' ? 'prod-sg.env' : 'uat-sg.env');
				break;

			case 'TW':
				envFileName = envTest === 'dev' ? 'dev.env' : (envTest === 'prod' ? 'prod-tw.env' : 'uat-tw.env');
				break;

			case 'KR':
				envFileName = envTest === 'dev' ? 'dev.env' : (envTest === 'prod' ? 'prod-kr.env' : 'uat-kr.env');
				break;

			case 'AU':
				envFileName = envTest === 'dev' ? 'dev.env' : (envTest === 'prod' ? 'prod-au.env' : 'uat-au.env');
				break;

			default:
				envFileName = envTest === 'dev' ? 'dev.env' : 'uat-hk.env';
				break;
		}

		return envFileName;
	}
}
