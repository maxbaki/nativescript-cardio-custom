var CardIO = null;

try {
  CardIO = UIViewController.extend({
      setup: function() {
        CardIOUtilities.preload();
      },
      init: function() {
          var self = this.super.init();
          if (self) {
              // The base class initialized successfully
              console.log("Initialized");
          }

          console.log("card IO utilities loaded");

          return self;
      },
      scanCard: function(viewController) {
        var self = this;

        return new Promise(function (resolve, reject) {
          self.resolve = resolve;
          self.reject = reject;


          var scanViewController = CardIOPaymentViewController.new().initWithPaymentDelegate(self);
          scanViewController.delegate = self;
          scanViewController.modalPresentationStyle = UIModalPresentationFormSheet;
          scanViewController.hideCardIOLogo=YES;          
          viewController.presentViewControllerAnimatedCompletion(scanViewController,true,null);
        });

      },

      userDidProvideCreditCardInfoInPaymentViewController: function(info, paymentViewController) {

          paymentViewController.dismissViewControllerAnimatedCompletion(true,null);
          if(this.resolve) this.resolve(info);
          console.log("did receive card number:", info.redactedCardNumber);
      },
      userDidCancelPaymentViewController: function(paymentViewController) {
          debugger;

          console.log("cancel");
          paymentViewController.dismissViewControllerAnimatedCompletion(true,null);
          if(this.reject) this.reject();
      }
  }, {
      name: "CardIO",
      protocols: [CardIOPaymentViewControllerDelegate]
  });

  CardIO.ObjCProtocols = [CardIOPaymentViewControllerDelegate];
} catch (e) {
  console.log(e.message);
}

exports.CardIO = CardIO.new();
