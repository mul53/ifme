var onReadyAddComment = function() {
  if (isShow(['moments', 'strategies', 'meetings'])) {
    $(document).on('click', '#add_comment_button', function(event) {
      event.preventDefault();

      if (!$(this).prop('disabled')) {
        $(this).prop('disabled', true);
        $('#comment_comment').prop('disabled', true);
        $(this).val(I18n.t('comment.posting'));

        var url;
        if (isShow(['moments'])) {
          url = '/moments/comment';
        } else if (isShow(['strategies'])) {
          url = '/strategies/comment';
        } else {
          url = '/meetings/comment';
        }

        var viewers;
        if ($('#comment_viewers').length) {
          viewers = $('#comment_viewers').val();
        }

        var data = {
          commentable_type: $('#comment_commentable_type').val(),
          commentable_id:$('#comment_commentable_id').val(),
          comment_by: $('#comment_comment_by').val(),
          comment: $('#comment_comment').val(),
          visibility: $('#comment_visibility').val(),
          viewers: viewers
        };

        $.ajax({
          dataType: 'json',
          url: url,
          type: 'POST',
          data: data,
          success: function(json) {
            if (json !== undefined) {
              $('#add_comment_button').prop('disabled', false);
              $('#comment_comment').prop('disabled', false);
              $('#comment_comment').val('');
              $('#add_comment_button').val(I18n.t('comment.singular'));

              if (!json.no_save) {
                var commentid = 'comment_' + json.commentid;
                var profile_picture = json.profile_picture;
                var comment_info = json.comment_info;
                var comment_text = json.comment_text;
                var visibility = json.visibility;
                var delete_comment = json.delete_comment;

                var newComment = '<div class="comment smallMarginTop" id="' + commentid + '">';
                newComment += '<div class="gridRowSpaceBetween">';
                newComment += '<div class="comment_info">';
                newComment += comment_info;
                newComment += '</div>';
                if (delete_comment !== null && delete_comment.length > 0) {
                  newComment += delete_comment;
                }
                newComment += '</div>';
                newComment += '<div class="comment_text">';
                newComment += comment_text;
                newComment += '</div>';
                newComment += '<div class="subtle">';
                if (visibility !== null && visibility.length > 0) {
                  newComment += visibility;
                }
                newComment += '</div>';
                newComment += '</div>';

                $('#comments').prepend(newComment);
              }
            }
          },
          error: function() {
            $('#add_comment_button').prop('disabled', false);
            $('#comment_comment').prop('disabled', false);
          $('#add_comment_button').val(I18n.t('comment.singular'));
          }
        });
      }
    });
  }
};

loadPage(onReadyAddComment);
