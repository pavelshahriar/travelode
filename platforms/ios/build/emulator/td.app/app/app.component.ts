import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  template: `
    <ActionBar title="Travelode" class="action-bar"></ActionBar>
    <StackLayout>
      <Image src="~/images/apple.jpg" class="logo"></Image>
      <TextField hint="Email Address" keyboardType="email"
                 autocorrect="false" autocapitalizationType="none"></TextField>
      <TextField hint="Password" secure="true"></TextField>

      <Button text="Sign in" class="submit-button"></Button>
    </StackLayout>
  `,
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class AppComponent {
  // Your TypeScript logic goes here
}
