"""empty message

Revision ID: 5a96c7b5f82a
Revises: af205b9982e4
Create Date: 2022-12-04 14:06:39.016893

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '5a96c7b5f82a'
down_revision = 'af205b9982e4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('anonymous_links',
    sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
    sa.Column('stub', sa.String(length=100), nullable=False),
    sa.Column('long_url', sa.String(length=2083), nullable=False),
    sa.Column('created_on', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_on', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('stub')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('anonymous_links')
    # ### end Alembic commands ###
