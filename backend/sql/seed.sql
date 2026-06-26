-- Clear existing sample data to avoid duplicates if this script is run again
truncate table support_tickets, chat_messages, document_chunks, documents cascade;

-- Insert sample documents
insert into documents (file_name, file_type, status)
values
  ('User Guide.pdf', 'pdf', 'indexed'),
  ('Pricing and Plans.pdf', 'pdf', 'indexed'),
  ('Refund Policy.pdf', 'pdf', 'pending_review');

-- Insert sample document chunks
insert into document_chunks (document_id, chunk_index, content)
select
  documents.id,
  1,
  'Users can reset their password from the Account Settings page. If they cannot access their account, they should click "Forgot password" on the login page and follow the reset link sent to their email.'
from documents
where documents.file_name = 'User Guide.pdf';

insert into document_chunks (document_id, chunk_index, content)
select
  documents.id,
  2,
  'Users can upload documents from the Documents page. Supported file types include PDF and TXT. After upload, the system processes the document and makes it available for AI-assisted search.'
from documents
where documents.file_name = 'User Guide.pdf';

insert into document_chunks (document_id, chunk_index, content)
select
  documents.id,
  1,
  'Enterprise plans are custom-priced based on usage and team size. Specific enterprise pricing is not available in the public knowledge base. Enterprise pricing questions should be escalated to the sales or support team for human review.'
from documents
where documents.file_name = 'Pricing and Plans.pdf';

insert into document_chunks (document_id, chunk_index, content)
select
  documents.id,
  1,
  'Customers can request a refund within 14 days of purchase if they have not exceeded fair usage limits. Refund requests outside the standard refund window should be reviewed by a human support team member.'
from documents
where documents.file_name = 'Refund Policy.pdf';

-- Insert sample chat messages
insert into chat_messages (role, content, source_document_id, confidence)
values
  ('customer', 'How do I reset my password?', null, null);

insert into chat_messages (role, content, source_document_id, confidence)
select
  'assistant',
  'You can reset your password from the Account Settings page. If you cannot access your account, click "Forgot password" on the login page and follow the reset link sent to your email.',
  documents.id,
  'high'
from documents
where documents.file_name = 'User Guide.pdf';

insert into chat_messages (role, content, source_document_id, confidence)
values
  ('customer', 'What is the enterprise pricing plan?', null, null),
  ('assistant', 'I could not find a specific enterprise price in the current knowledge base. I have created a support ticket for a human team member to review.', null, 'low');

-- Insert sample support tickets
insert into support_tickets (question, ai_summary, status, priority)
values
  (
    'What is the enterprise pricing plan?',
    'The knowledge base says enterprise pricing is custom-priced and should be escalated to the sales or support team.',
    'needs_human_review',
    'medium'
  ),
  (
    'Can I integrate this with my LMS?',
    'The current knowledge base does not contain enough information about LMS integrations.',
    'needs_human_review',
    'high'
  ),
  (
    'Do you support bulk student uploads?',
    'The current knowledge base does not clearly explain whether bulk student uploads are supported.',
    'open',
    'low'
  );