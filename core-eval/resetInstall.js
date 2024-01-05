const resetInstall = ({
  installation: {
    produce: {
      manualTimerInstallation
    }
  }
                      }) => {
  console.log('Resetting...');
  manualTimerInstallation.reset();
  console.log('Done.');
};

resetInstall;