import React from 'react';
import { Grid, Typography } from '@material-ui/core';
//RootComponents
import BasicInput from '../../BasicComponents/BasicInput';
import BasicButton from '../../BasicComponents/BasicButton';
import { content } from '../Login.utils';
export function OTPScreen({
	matches,
	classes,
	form,
	views,
	dispatchViews,
	updateForm,
	next,
	requestOTP,
}) {
	const dispatchValue = ({ key, value }) => {
		updateForm({ key, value, index: 0 });
	};

	return (
		<Grid
			className={matches ? classes.loginContainer : classes.loginContainerSm}
			container
			item
			md={8}
			spacing={0}
			alignItems='center'
			alignContent='center'
			justify='center'
		>
			<Grid item xs={7} className={classes.mb4}>
				<Typography variant='h4'>Confirmation code</Typography>
			</Grid>
			<Grid item container xs={7} className={classes.mb4}>
				<BasicInput
					value={form[0].otp.value}
					dispatchValue={dispatchValue}
					errorText={form[0].otp.error}
					label={content.text.otpInput}
					type='numerical'
					mapperKey='otp'
					name='otp'
				/>
			</Grid>
			<Grid item container xs={7} className={classes.mb4}>
				<BasicButton handleClick={next} color='primary' fullWidth={true}>
					{content.text.otpButton}
				</BasicButton>
			</Grid>
			<Grid item container xs={7} className={classes.mb4}>
				<BasicButton handleClick={requestOTP} color='primary' fullWidth={true}>
					Send code to my email again
				</BasicButton>
			</Grid>
			<Grid item container xs={7}>
				<BasicButton
					handleClick={() =>
						dispatchViews({
							login: true,
							signUp: false,
							splashScreen: matches,
							otpScreen: false,
						})
					}
					color='primary'
					fullWidth={true}
				>
					Go back
				</BasicButton>
			</Grid>
		</Grid>
	);
}
